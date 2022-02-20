import { withLayout } from "../layout/Layout";


export const Error404 = ():JSX.Element => {
  return (
    <div>
      404 Error...
    </div>
  );
};

export default withLayout(Error404);