import Bar from "@/components/about/bar/bar";
import Cover from "@/components/about/cover/cover-second";
import Feedback from "@/components/about/feedback/feedback";
import Footer from "@/components/about/footer/footer";
import FeatureCards, {
  FeatureCardsForStartups,
} from "@/components/use-cases/feature-cards/feature-cards";
import { Wrapper } from "@/pages/about";

const SecondPage = () => {
  return (
    <>
      <Bar />

      <Wrapper>
        <Cover type={"startups"} />

        <FeatureCardsForStartups />

        <Feedback />
        <Footer />
      </Wrapper>
    </>
  );
};

export default SecondPage;