import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import { MenuItem } from "../interfaces/menu.interface";
import { withLayout } from "../layout/Layout";


const SearchPage:NextPage = ():JSX.Element => {
  return (
    <div>
      What are you search?
    </div>
  );
};

export default withLayout(SearchPage);

export const getStaticProps:GetStaticProps<FindProps> = async() => {
  const firstCategory =0;
  const {data:menu} =await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",{firstCategory});
  return {
    props:{
      menu,
      firstCategory
    }
  };
};

interface FindProps extends Record<string,unknown>{
  menu:MenuItem[],
  firstCategory:number
}