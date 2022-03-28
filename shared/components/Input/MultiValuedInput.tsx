import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

type Props = {
  tags: string[];
  onChange: (vals: any) => any;
};

const MultiValuedInput = ({ tags, onChange }: Props) => {
  return <ReactTagInput tags={tags} onChange={onChange} />;
};

export default MultiValuedInput;
