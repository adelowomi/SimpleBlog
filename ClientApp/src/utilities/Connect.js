export default function( Url,Method,Data=null){
    var token = localStorage.getItem('token');
    if(token){
       token = 'Bearer ' + token
    }
    var Response = fetch(`/api/${Url}`,{
        method: Method,
        body:Data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
      })
      Response.then(res=> {
          if(res.status == 401){
              window.location.href = '/login';
          }
      })
    return Response;
}