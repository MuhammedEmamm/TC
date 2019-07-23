const urls = {
    serverUrl: 'http://yakensolution.cloudapp.net/Segada/api/Collection/'
};
const endpoints = {
   AboutRoom: 'AboutTheRoom' ,
   Members:'Members' ,
   Vision:'Visions',
   Plans:'Plans',
   Boards:'Boards',
   Employees:'Employees',
   Rules:'Rules' , 
   Services:'Services',
   Banners:'Banners',
   Cities:'Cities',
   Categories:'Categories' ,
   Divisions:'Divisions' ,
   GetMember:'GetMember?',
   Media:'Media',
   News:'news',
   GetEvent:'GetEvents?' ,
   Events:'GetAllEvents?'
};
export function endpoint(name) {
    return urls.serverUrl + endpoints[name];
}