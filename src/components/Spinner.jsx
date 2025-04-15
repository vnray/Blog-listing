const Spinner = () => {
  const spinnerIMG =
    "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_large.gif";
  return (
    <div className="spinner-wrapper">
      <img src={spinnerIMG} alt="spinner" />
     
    </div>
  );
};

export default Spinner;
