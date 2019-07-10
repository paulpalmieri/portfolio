const fetchTopic = repo_name => {
  $.ajax({
    url: `https://api.github.com/repos/paulpalmieri/${repo_name}/topics`,
    type: "GET",
    async: "false",
    headers: {
      Accept: "application/vnd.github.mercy-preview+json"
    },
    success: function(res) {
      let tag_str = "";
      // console.log(res.names.length);
      // console.table(res.names);
      if (res.names.length > 0) {
        res.names.forEach(element => {
          tag_str += `<div class="topics">${element}</div>`;
          // $("#github-container").append(tag_str);
        });
        $(`.topics_container[data-name="${repo_name}"]`).append(tag_str);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
};

const fetchLanguages = repo_name => {
  $.ajax({
    url: `https://api.github.com/repos/paulpalmieri/${repo_name}/languages`,
    type: "GET",
    async: "false",
    success: function(res) {
      let tag_str = "";
      if (!jQuery.isEmptyObject(res)) {
        const keys = Object.keys(res);

        const total = keys.reduce(function(total, element) {
          console.log(res[element] + ":  " + element);
          return total + res[element];
        }, 0);

        console.log(total);

        keys.forEach(element => {
          const percentage = Number(((res[element] / total) * 100).toFixed(1));
          tag_str += `<div class="language">${element}: ${percentage}%</div>`;
        });
        $(`.language_container[data-name="${repo_name}"]`).append(tag_str);
        // console.log(tag_str);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
};

$(document).ready(function() {
  // fetch all my repos
  $.ajax({
    url: "https://api.github.com/users/paulpalmieri/repos",
    type: "GET",
    success: function(res) {
      console.table(res);
      res
        .sort(function(a, b) {
          // sort by recently updated
          return a.updated_at > b.updated_at ? -1 : 1;
        })
        .forEach(function(el) {
          // create all divs containing each fetched repository
          const lc_name = el.name.toLowerCase();
          const has_gitpages = el.has_pages
            ? `<a class="direct-access" href="http://paulpalmieri.github.io/${lc_name}/">Hosted on <i class="fa fa-github"></i></a>`
            : "";
          const toggle_git_pages = false;

          // console.log(has_gitpages);
          const proj_tag = `<div class="project">
        <a href=${el.svn_url}><i class="fa fa-github"></i>  ${lc_name}</a> ${
            toggle_git_pages ? has_gitpages : ""
          }
        <p>${
          el.description !== null
            ? el.description
            : "No description for this project"
        }</p>
        <div class="topics_container" data-name="${el.name}"></div>
        <div class="language_container" data-name="${el.name}"></div>
            </div>`;
          $("#github-container").append(proj_tag);
          fetchTopic(el.name);
          // fetchLanguages(el.name);
        });
    },
    error: function(err) {
      console.log(err);
    }
  });
});

// $("input").on("change", function() {
//   document.documentElement.style.setProperty(`--${this.name}`, this.value);
// });
