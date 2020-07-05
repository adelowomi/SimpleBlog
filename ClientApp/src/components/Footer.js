import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
  <hr className="py-2 " />
  <footer className="page-footer pt-3 mt-4 text-center text-md-left " style={{backgroundColor: '#1e90ff'}}>
    {/*Social buttons*/}
    <div className="col-md-12 wow fadeIn " data-wow-delay="0.3s ">
      <div className="text-center d-flex justify-content-center my-4 ">
        <a className="p-2 m-2 fa-lg fb-ic "><i className="fab fa-facebook-f white-text fa-lg pr-md-4 "> </i></a>
        {/*Twitter*/}
        <a className="p-2 m-2 fa-lg tw-ic "><i className="fab fa-twitter white-text fa-lg pr-md-4 "> </i></a>
        {/*Google +*/}
        <a className="p-2 m-2 fa-lg gplus-ic "><i className="fab fa-google-plus-g white-text fa-lg pr-md-4 "> </i></a>
        {/*Linkedin*/}
        <a className="p-2 m-2 fa-lg li-ic "><i className="fab fa-linkedin-in white-text fa-lg pr-md-4 "> </i></a>
        {/*Instagram*/}
        <a className="p-2 m-2 fa-lg ins-ic "><i className="fab fa-instagram white-text fa-lg pr-md-4 "> </i></a>
      </div>
    </div>
    {/*/.Social buttons*/}
    <div className="footer-copyright pt-3 text-center " style={{backgroundColor: '#1e90ff'}}>
      <div className="layers">
        <div className="container-fluid ">
          © 2020 Copyright: <a href="# " style={{fontWeight: 400}}>TestProject.com </a>
        </div>
      </div>
    </div>
  </footer>
</div>

        )
    }
}
