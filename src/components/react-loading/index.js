import React from 'react'
import ReactLoading from "react-loading";
import "./styles.css";

// using react loading to render a spinner for loading
const LoadingComponent = () => {
  return (
    <div className="ReactLoading">
        <ReactLoading type={'spinningBubbles'} color="#000" />
    </div>
  )
}

export default LoadingComponent