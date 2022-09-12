import React, { useEffect, useState } from 'react'

const Modal = ({ modalContent, closeModal }) => {

    useEffect(() => {
        setTimeout(() => {
            closeModal()
        }, 1000)
    }, [])

  return (
    <span className='modal'>{modalContent}</span>
  )
}

export default Modal;

