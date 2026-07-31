import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Blog from "../pages/blog/Blog";
import BlogPost from "../pages/blog/BlogPost";
import Gallery from "../pages/myGallery/Gallery";
import NotFound from "../pages/notFound/NotFound";
import Admin from "../pages/admin/Admin";
import { ADMIN_ENABLED } from "../pages/admin/adminAuth";
import Resume from "../pages/resume/Resume";
import { SECTIONS, isHomepagePath } from "../config/sections";

const PublicRouter = () => {
  const location = useLocation();
  // Every section path is the same page, so they share one fade key: keying on
  // the raw pathname would remount the homepage and replay its animations each
  // time a tab is clicked.
  const fadeKey = isHomepagePath(location.pathname) ? "/" : location.pathname;

  return (
    <div key={fadeKey} className="page-fade">
      <Routes location={location}>
        <Route path="/" element={<Homepage />} />
        {/* "/portfolio", "/contact", … render the homepage and RouteScrollManager
            scrolls to the matching section. */}
        {SECTIONS.map(({ id }) => (
          <Route key={id} path={`/${id}`} element={<Homepage />} />
        ))}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resume" element={<Resume />} />
        {ADMIN_ENABLED && <Route path="/admin" element={<Admin />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default PublicRouter;
