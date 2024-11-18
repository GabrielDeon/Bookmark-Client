import '../styles/PageTitle.css';

interface PageTitleProps {
    name: string;
}

function PageTitle({ name }: PageTitleProps) {
    return (
      <div className="pageTitle">
        <div className="pageTitleContent">
          <div className="pageTitleTop">
            <h1>{name}</h1>
          </div>          
        </div>        
      </div>
    );
  }
  
  export default PageTitle;
  