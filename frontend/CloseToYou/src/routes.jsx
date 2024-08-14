import { Routes, Route } from "react-router-dom";
import PageLayout from "./layout/pageLayout/PageLayout";
import LandingPage from "./pages/landing/LandingPage";
import LandingPageLayout from "./layout/landingPageLayout/LandingPageLayout";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import ClosetsPage from "./pages/closets/list/ClosetsPage.jsx";
import ClosetsDetailPage from "./pages/closets/detail/ClosetsDetailPage.jsx";
import ClothesListPage from "./pages/clothes/list/ClothesListPage";
import ClothesDetailPage from "./pages/clothes/detail/ClothesDetailPage";
import ClothesNfcPage from "./pages/clothes/nfc/ClothesNfcPage";
import ClothesEditPage from "./pages/clothes/edit/ClothesEditPage";
import SearchPage from "./pages/search/SearchPage";
import BookMarkListPage from "./pages/bookmarks/list/BookMarkListPage";
import BookMarkDetailPage from "./pages/bookmarks/detail/BookMarkDetailPage";
import UserViewPage from "./pages/user/view/UserViewPage.jsx";
import UserEditPage from "./pages/user/edit/UserEditPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout page={<LandingPage />} />} />
      <Route path="/signin" element={<LandingPageLayout page={<SignInPage />} />} />
      <Route path="/signup" element={<LandingPageLayout page={<SignUpPage />} />} />
      <Route path="/closets" element={<PageLayout page={<ClosetsPage />} />} />
      <Route path="/closets/:id" element={<PageLayout page={<ClosetsDetailPage />} />} />
      <Route path="/clothes" element={<PageLayout page={<ClothesListPage />} />} />
      <Route path="/clothes/:id" element={<PageLayout page={<ClothesDetailPage />} />} />
      <Route path="/clothes/edit/:id" element={<PageLayout page={<ClothesEditPage />} />} />
      <Route path="/clothes/nfc" element={<PageLayout page={<ClothesNfcPage />} />} />
      <Route path="/search" element={<PageLayout page={<SearchPage />} />} />
      <Route path="/bookmarks" element={<PageLayout page={<BookMarkListPage />} />} />
      <Route path="/bookmarks/:id" element={<PageLayout page={<BookMarkDetailPage />} />} />
      <Route path="/user" element={<PageLayout page={<UserViewPage />} />} />
      <Route path="/nickname" element={<PageLayout page={<UserEditPage type="nickname" />} />} />
      <Route path="/password" element={<PageLayout page={<UserEditPage type="password" />} />} />
    </Routes>
  );
};

export default AppRoutes;
