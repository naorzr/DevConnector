import React from "react";

export default () => {
  return (
    <footer class="page-footer bg-dark text-white mt-5 p-4 text-center ">
      &copy; {new Date().getFullYear()} DevConnector Copyright:
      <p>Naor Zruk</p>
      <a
        target="_blank"
        href="https://github.com/naorzr?tab=repositories"
        class="fab fa-4x fa-github"
      />
      <p>Check My Other Projects On Github</p>
    </footer>
  );
};
