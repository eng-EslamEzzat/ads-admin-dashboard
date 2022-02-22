import React from 'react'
import ReactLoading from "react-loading";
import "./styles.css";

const LoadingComponent = () => {
  return (
    <div className="ReactLoading">
        <ReactLoading type={'spinningBubbles'} color="#000" />
    </div>
  )
}

export default LoadingComponent