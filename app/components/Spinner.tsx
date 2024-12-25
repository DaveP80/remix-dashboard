function Spinner({h}: {h: string}) {
  return (
    <div className={`flex justify-center items-center ${h == "screen" ? "min-h-screen" : ""}`}>
    <div className="spinner"></div>{" "}
  </div>
  )
}

export default Spinner