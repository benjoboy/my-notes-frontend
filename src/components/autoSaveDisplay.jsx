const AutoSaveDisplay = ({ saving }) => {
  let display;
  switch (saving) {
    case SavingState.SAVING:
      display = <em>saving...</em>;
      break;
    case SavingState.SAVED:
      display = (
        <>
          <Icon check /> <em>saved!</em>
        </>
      );
      break;
    default:
      display = <br />;
  }
  return <div className="auto-save-display">{display}</div>;
};
AutoSaveDisplay.propTypes = {
  saving: PropTypes.oneOf(Object.values(SavingState)),
};
