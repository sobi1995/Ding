using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatweb.Model
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, UserSocket> Users = new ConcurrentDictionary<string, UserSocket>();
        private readonly ILogger<ChatHub> _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            this._logger = logger;
        }
        public byte MaxMemberOfGroup { get; set; }


        public async Task SendMessageAllUser(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task DeleteRoom(string ConnectionId, string room)
        {
            await SedndMessageGroup(room, new Message() { GroupName = room, Status = Status.DisConnect, Msg = "Left user" });
            await Groups.RemoveFromGroupAsync(ConnectionId, room);
        }

        public ChatHub()
        {
            MaxMemberOfGroup = 2;
        }

        public void SendSpecialUserAllConations(string[] conationsids, string message)
        {
            foreach (var conationsid in conationsids)
            {

                Clients.Client(conationsid).SendAsync("SendSpecialUser", message);
            }
        }
        public void SendSpecialUser(string conationsid, Message message)
        {


            Clients.Client(conationsid).SendAsync("ReceiveMessage", message);
        }
        public Task SedndMessageGroupExceptCurentUser(MessageGroup message)
        {
            this._logger.LogInformation(message.Message);
            return Clients.GroupExcept(message.GroupName, Context.ConnectionId).SendAsync("ReceiveMessage", message);
        }


        public Task SedndMessageGroup(string groupname, Message message)
        {
            return Clients.Group(groupname).SendAsync("ReceiveMessage", message);
        }
        public Task JoinGroup(string conationsid, string group)
        {

            return Groups.AddToGroupAsync(conationsid, group);
        }
        public void FoundUserAndCreateChat()
        {
            var user = Users.Where(x => x.Value.IsChating == false && x.Value.ConnectionIds.Any(x => x != Context.ConnectionId)).FirstOrDefault();


            if (user.Key != null)
            {
                var usesr = Users.Where(x => x.Value.ConnectionIds.Any(c => c == Context.ConnectionId)).FirstOrDefault();

                Users[user.Key].IsChating = true;
                Users[usesr.Key].IsChating = true;
                var groupName = Context.ConnectionId + user.Value.ConnectionIds.FirstOrDefault();
                Users[user.Key].GroupName = groupName;
                Users[usesr.Key].GroupName = groupName;

                JoinGroup(Context.ConnectionId, groupName);
                JoinGroup(user.Value.ConnectionIds.FirstOrDefault(), groupName);

                SedndMessageGroup(groupName, new Message() { Msg = "The User Is Found", Status = Status.FoundUser, GroupName = groupName });
            }

        }

        public override Task OnConnectedAsync()
        {

            var connectionId = Context.ConnectionId;

            var user = Users.GetOrAdd(connectionId,
                _ => new UserSocket
                {
                    Name = connectionId,
                    ConnectionIds = new HashSet<string>(),
                    IsChating = false
                });
            lock (user.ConnectionIds)
            {
                user.ConnectionIds.Add(connectionId);
            }

            FoundUserAndCreateChat();
            SendMessageAllUser(new Message() { Msg = Users.Count.ToString(), Status = Status.OnlineUser });
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
        
            DeleteRoom(Context.ConnectionId, Users[Context.ConnectionId.ToString()].GroupName);  
            DeleteUser(Context.ConnectionId);
            SendMessageAllUser(new Message() { Msg = Users.Count.ToString(), Status = Status.OnlineUser });

            return base.OnDisconnectedAsync(exception);
        }

        private async void DeleteUser(string connectionId)
        {
            var keysToRemove = Users.Keys.Where(key => key == connectionId).ToList();
            keysToRemove.ForEach(key => Users.TryRemove(key, out UserSocket obj));
        }


    }


    public class UserSocket
    {

        public string Name { get; set; }
        public bool IsChating { get; set; }
        public HashSet<string> ConnectionIds { get; set; }
        public string GroupName { get; set; }
    }


    public class StatusMy
    {
        public int userid { get; set; }
        public Status statusenum { get; set; }

    }
    public enum Status
    {

        Chating = 1,
        Waiting = 0,
        NoneOnline = 3,
        FoundUser = 4,
        IsTyping = 5,
        OnlineUser = 7,
        DisConnect = 6
    }


    public class UserConnectionSignalR
    {
        public int Id { set; get; }
        public string Name { get; set; }
        public HashSet<string> ConnectionIds { get; set; }
    }


    public class Message
    {
        public string Msg { get; set; }
        public Status Status { get; set; }
        public DateTime Date { get; set; }
        public string GroupName { get; set; }
        public Message()
        {
            Date = DateTime.Now;
        }
    }

    public class MessageGroup
    {
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        public string GroupName { get; set; }

    }

}