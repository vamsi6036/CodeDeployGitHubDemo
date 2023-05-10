import React from "react";
import QuickItems from "./QuickItems";

class Quick extends React.Component{
    render(){
        const { mealtypeData } = this.props;
        return(
            <div>
<div className="row">
        <span className="col-1"></span>
        <span className="col-3 mt-4">
            <h3 style={{fontWeight: "bolder",color: "#192F60"}}>Quick Searches</h3>
        </span>
        <span className="col-8"></span>
    </div>
    <div className="row">
        <span className="col-1"></span>
        <span className="col-4 mt-2">
            <h5 style={{color:"#8C96AB"}}>Discover restaurants by type of meal</h5>
        </span>
        <span className="col-7"></span>
    </div>
    <div className="container cards mt-2  d-flex flex-wrap" style={{marginLeft: "8rem"}}>
    {
                            mealtypeData.map((items) => {
                                return(
                                    <QuickItems data = { items } />
                                )
                            })
                        }
    </div>
            </div>
        )
    }
}

export default Quick;