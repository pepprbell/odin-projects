const Image = ({ src }) => {
  return (
    <>
      {src != '' ?
      <img src={src} alt=""  /> :
      <div><span className="material-symbols-outlined notSupported">image_not_supported</span></div> }
    </>
  )
}

export default Image