export default function( Url,Method,Data=null){
    var Response = fetch(`/api/${Url}`,{
        method: Method,
        body:Data,
        headers:{
            'Content-Type': 'application/json'
        }
      })
    return Response;
}