import "./LoadingSpinner.scss";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner-overlay"}`}>
      <div className={props.color ? "lds-dual-ring-white" : "lds-dual-ring"}></div>
    </div>
  );
};

export default LoadingSpinner;
