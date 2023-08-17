import React from 'react'

const RenderArray = ({array}) => {
    console.log('Array', array)
  return (
    <div>
        {array != [] && array.map(
            (elem) => { 
                return (
                    <div>
                        {elem.Symbol}
                    </div>
                )
             }
        )}
    </div>
  )
}

export default RenderArray
