import "../sylesheets/papersList.scss";

const PapersList = ({ papers }) => {
  return (
    <div className="papers-container">
      <h3 className="papers-title">Paper titles</h3>
      {papers &&
        papers.map((paper) => (
          <div className="papers-inner-container" key={paper.id}>
            <div className="paper-body-text">• {paper.title}</div>
          </div>
        ))}
    </div>
  );
};

export default PapersList;
