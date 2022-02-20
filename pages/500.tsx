import { withLayout } from "../layout/Layout";


const Error500 = ():JSX.Element => {
  return (
    <div>
      500 Error...
    </div>
  );
};

export default withLayout(Error500);