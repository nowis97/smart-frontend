import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function (props) {
   return  (<div style={{position: 'absolute', zIndex: 110, top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.8)'}}>
        <CircularProgress size={110} />
    </div>)
}