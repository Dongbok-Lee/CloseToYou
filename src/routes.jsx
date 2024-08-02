import { Routes, Route } from "react-router-dom";
import PageLayout from "./layout/pageLayout/PageLayout";
import LandingPage from "./pages/landing/LandingPage";
import LandingPageLayout from "./layout/landingPageLayout/LandingPageLayout";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import ClosetsPage from "./pages/closets/ClosetsPage";
import ClothesListPage from "./pages/clothes/list/ClothesListPage";
import ClothesDetailPage from "./pages/clothes/detail/ClothesDetailPage";
import SearchPage from "./pages/search/SearchPage";
import BookMarkListPage from "./pages/bookmarks/list/BookMarkListPage";
import BookMarkDetailPage from "./pages/bookmarks/detail/BookMarkDetailPage";
import UserPage from "./pages/user/view/UserPage";
import PasswordPage from "./pages/user/password/PasswordPage";
import NicknamePage from "./pages/user/nickname/NicknamePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout page={<LandingPage />} />} />
      <Route path="/signin" element={<LandingPageLayout page={<SignInPage />} />} />
      <Route path="/signup" element={<LandingPageLayout page={<SignUpPage />} />} />
      <Route path="/closets" element={<PageLayout page={<ClosetsPage />} />} />
      <Route path="/clothes" element={<PageLayout page={<ClothesListPage />} />} />
      <Route path="/clothes/:id" element={<PageLayout page={<ClothesDetailPage />} />} />
      <Route path="/search" element={<PageLayout page={<SearchPage />} />} />
      <Route path="/bookmarks" element={<PageLayout page={<BookMarkListPage />} />} />
      <Route path="/bookmarks/:id" element={<PageLayout page={<BookMarkDetailPage />} />} />
      <Route path="/user" element={<PageLayout page={<UserPage />} />} />
      <Route path="/nickname" element={<PageLayout page={<NicknamePage />} />} />
      <Route path="/password" element={<PageLayout page={<PasswordPage />} />} />
    </Routes>
  );
};

export default AppRoutes;
