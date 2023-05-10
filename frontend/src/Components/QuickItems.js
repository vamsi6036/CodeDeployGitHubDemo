import React from "react";

import { useNavigate } from "react-router-dom";

//class QuickSearchItem extends React.Component{

const QuickItems = (props) => {
    const { _id, name, content, image } = props.data;

    const nav = useNavigate();// page navigation using browser level

    const ShowFilter = () => {
        nav('./filter',{replace: true});// this will change the page using browser only (without URl Part)
    }

        return(
            <div>
                <div onClick={() => ShowFilter(_id)}>
                <div className="card mb-3" style={{maxWidth: "360px",height: "160px",boxShadow: "0px 3px 6px #00000029"}}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={`./img/${image}`} style={{height: "160px"}} className="img-fluid rounded-start" alt="..."/>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title" style={{color: "#192F60",fontWeight: "bold"}}>{name}</h5>
                          <p className="card-text" style={{color:"#8C96AB"}}>{content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    
}
export default QuickItems;