import { FC } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// STYLE
import { IntroWrapper } from "./intro.style";
// Components
import { BsMouseFill } from "react-icons/bs";
import { FaAngleDoubleDown } from "react-icons/fa";

const IntroSection: FC = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  useGSAP(() => {
    gsap.to("#down__arrows",{
        y:10,
        yoyo:true,
        repeat:-1,
        duration:2
    })
  });
  return (
    <IntroWrapper>
      <div className="intro__section">
        <div className="header__content">
          <h1 className="header__content__title">عربى</h1>
          <p className="header__content__details">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
            توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى
            نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.
            العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم
            إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في
            أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث.
            على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن
            طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.
          </p>
          <div className="scroll__down">
            <div className="scroll_order">
              <p>Scroll down</p>
              <BsMouseFill />
            </div>
            <FaAngleDoubleDown id="down__arrows" size={24}/>
          </div>
        </div>
      </div>
    </IntroWrapper>
  );
};
export default IntroSection;
