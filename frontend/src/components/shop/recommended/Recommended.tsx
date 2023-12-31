import { useEffect, useContext } from "react";
import axios from "../../../axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductsContext from "../../../context/products-context";
import RecommendedItem from "./RecommendedItem";
import "./Recommended.css";

const Recommended = () => {
  const { recommendedProducts, setRecommendedProducts } =
    useContext(ProductsContext);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const res = await axios.get("products/recommended");
        const products = res.data.products;
        setRecommendedProducts(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecommendedProducts();
  }, []);

  const recommendedProductItems = recommendedProducts.map((product) => (
    <SwiperSlide key={product["_id"]}>
      <RecommendedItem
        id={product["_id"]}
        key={product["_id"]}
        name={product["name"]}
        description={product["description"]}
        photoUrl={product["photoUrl"]}
        price={product["price"]}
        isRecommended={product["isRecommended"]}
      />
    </SwiperSlide>
  ));

  const breakpoints = {
    1: {
      slidesPerView: 1,
    },
    1150: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 3,
    },
  };

  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={false}
      loop={false}
      speed={1000}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      breakpoints={breakpoints}
      className={`mySwiper ${
        window.innerWidth <= 600 ? "mySwiper-mobile" : ""
      }`}
    >
      {recommendedProductItems}
    </Swiper>
  );
};

export default Recommended;
