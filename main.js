$(document).ready(function() {
  const query_url = "https://api.github.com/users/paulpalmieri/repos";
  $.ajax({
    url: query_url,
    type: "GET",
    success: function(res) {
      console.log(res);
      res
        .sort(function(a, b) {
          return a.updated_at > b.updated_at ? -1 : 1;
        })
        .forEach(function(el) {
          const lc_name = el.name.toLowerCase();
          const has_gitpages = el.has_pages
            ? `<a class="direct-access" href="http://paulpalmieri.github.io/${lc_name}/">Hosted on <i class="fa fa-github"></i></a>`
            : "";
          const toggle_git_pages = false;

          console.log(has_gitpages);
          const proj_tag = `<div class="project">
        <a href=${el.svn_url}>${lc_name}</a> ${
            toggle_git_pages ? has_gitpages : ""
          }
        <p>${
          el.description !== null
            ? el.description
            : "No description for this project"
        }</p>
            </div>`;
          $("#github-container").append(proj_tag);
        });

      //   const tags = res.forEach(el => {
      //     const display_tag = `<div class="single_project">
      //                     <a class="projects" href=${
      //                       el.svn_url
      //                     }>${el.name.toLowerCase()}</a>
      //                     <p>${
      //                       el.description !== null
      //                         ? el.description
      //                         : "No description for this project"
      //                     }</p>
      //                 </div>`;
      //     $("#github-container").append(display_tag);
      //   });

      document.getElementById;
    },
    error: function(err) {
      console.log(err);
    }
  });
});

// $("input").on("change", function() {
//   document.documentElement.style.setProperty(`--${this.name}`, this.value);
// });
