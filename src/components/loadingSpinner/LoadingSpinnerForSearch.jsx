import './LoadingSpinnerForSearch.scss';

const LoadingSpinnerForSearch = (props) => {
  return (
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinnerForSearch;