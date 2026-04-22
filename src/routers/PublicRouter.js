import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Blog from "../pages/blog/Blog";
import BlogPost from "../pages/blog/BlogPost";
import Gallery from "../pages/myGallery/Gallery";
import NotFound from "../pages/notFound/NotFound";
import Admin from "../pages/admin/Admin";
import Resume from "../pages/resume/Resume";

const PublicRouter = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-fade">
      <Routes location={location}>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default PublicRouter;
