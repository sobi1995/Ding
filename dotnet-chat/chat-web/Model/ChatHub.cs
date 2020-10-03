using Microsoft.AspNetCore.SignalR;
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
        private static readonly ConcurrentDictionary<string, UserSocket> Room = new ConcurrentDictionary<string, UserSocket>();
        private static object _lock = new object();

        //public async Task SendMessage(string message)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", message);
        //}
        public void Send(SendMessage message)
        {
            //message.read = 0;
            //string usernamecontact = _user.Where(x => x.Id == message.userr).Select(x => x.Username).FirstOrDefault();

            //var conationsids = GetConnection(usernamecontact);
            //var my = GetConnection(Context.User.Identity.Name);
            //message.id = _chat.SaveMessage(message);
            //if (conationsids != null)

            //    foreach (var conationsid in conationsids)
            //    {

            //        Clients.Client(conationsid).SendAsync("Send", message);
            //    }
            ////!!این قسمت باید اصلح شود

            //if (my != null)

            //    foreach (var conationsid in my)
            //    {

            //        Clients.Client(conationsid).SendAsync("Send", message);
            //    }
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
        public void FoundUserAndCreateChat()
        {
          if (Users.Keys.Count<=1)
            {
                SendSpecialUser(Context.ConnectionId, new Message()  {Msg=null,Status=Status.Waiting});
            }

        }

        public override Task OnConnectedAsync()
        {

            var connectionId = Context.ConnectionId;

            var user = Users.GetOrAdd(connectionId,
                _ => new UserSocket
                {
                    Name = connectionId,
                    ConnectionIds = new HashSet<string>()
                });
            lock (user.ConnectionIds)
            {
                user.ConnectionIds.Add(connectionId);
            }

            FoundUserAndCreateChat();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            DeleteUser(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        private async void DeleteUser(string connectionId)
        {
            var keysToRemove = Users.Keys.Where(key => key == connectionId).ToList();
            keysToRemove.ForEach(key => Users.TryRemove(key, out UserSocket obj));
        }
        public HashSet<string> GetConnection(string username)
        {
            //!!!!!!!the must fix
            UserSocket Con = new UserSocket();

            if (Users.TryGetValue(username, out Con) == false)
                return null;
            else
                return Con.ConnectionIds;
            //return Users.GetValueOrDefault(username).ConnectionIds;

        }

    }


    public class UserSocket
    {

        public string Name { get; set; }
        public Status Status { get; set; }
        public HashSet<string> ConnectionIds { get; set; }
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
        NoneOnline=3
    }
    public class UserConnectionSignalR
    {
        public int Id { set; get; }
        public string Name { get; set; }
        public HashSet<string> ConnectionIds { get; set; }
    }
    public class SendMessage
    {
        public int id { get; set; }
        public int users { get; set; }
        public int userr { get; set; }
        public string message { get; set; }
        public int sessionchat { get; set; }
        public int read { get; set; }
    }

    public class Message
    {
        public string Msg { get; set; }
        public Status Status { get; set; }
        public DateTime Date { get; set; }
        public Message()
        {
            Date = DateTime.Now;
        }
    }

    public class Room {
        public string UserId1 { get; set; }
        public string UserId2 { get; set; }

    }

}