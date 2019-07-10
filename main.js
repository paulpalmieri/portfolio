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
        .forEach(el =>
          $("#github-container").append(`<div class="project">
                        <a href=${el.svn_url}>${el.name.toLowerCase()}</a>
                        <p>${
                          el.description !== null
                            ? el.description
                            : "No description for this project"
                        }</p>
                    </div>`)
        );

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
