import "./MainPage.css";
import DisableButton from "../components/DisableButton";
import Input from "../components/AuthInput";
import TagInput from "../components/TagInput";

interface MainPageProps {
  setPage: (page: number) => void;
}

export default function MainPage({ setPage }: MainPageProps) {
  return (
    <div className="main-page">
      <div className="main-page-header">
        <div className="main-page-disable-button-text">Enable Extension:</div>
        <DisableButton />
      </div>
      <div className="main-page-body">
        <Input label="Auth Key" placeholder="Enter your GPT-3.5 Auth Key" />
        <TagInput label="Tag Website" placeholder="Enter a website to tag" setPage={setPage} />
      </div>
    </div>
  );
}