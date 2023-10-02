import React from 'react';
import { Oval } from 'react-loader-spinner'

export default function Loader(props) {
    return (
        <Oval
            height={props.height}
            width={props.width}
            color={props.color}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor={props.secondaryColor}
            strokeWidth={props.strokeWidth}
            strokeWidthSecondary={props.strokeWidthSecondary}
        />
    )
}

Loader.defaultProps = {
    height: 50,
    width: 50,
    color : "#fff",
    strokeWidth : 2,
    strokeWidthSecondary : 2,
    secondaryColor : '#fff'
  }
