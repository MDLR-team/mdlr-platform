import Bar from "@/components/about/bar/bar";
import Cover from "@/components/about/cover/cover-second";
import EnterpriseCover from "@/components/about/enterprise/enterprise-cover/enterprise-cover";
import EnterpriseFeedback from "@/components/about/enterprise/enterprise-feedback/enterprise-feedback";
import EnterpriseInterests from "@/components/about/enterprise/enterprise-interests/enterprise-interests";
import EnterpriseKit from "@/components/about/enterprise/enterprise-kit/enterprise-kit";
import Feedback from "@/components/about/feedback/feedback";
import Footer from "@/components/about/footer/footer";
import FeatureCards from "@/components/use-cases/feature-cards/feature-cards";
import { Wrapper } from "@/pages/about";

const SecondPage = () => {
  return (
    <>
      <Bar />

      <Wrapper>
        <EnterpriseCover />

        <EnterpriseInterests />

        <EnterpriseKit />

        <EnterpriseFeedback />
        <Footer />
      </Wrapper>
    </>
  );
};

export default SecondPage;
