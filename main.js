// fetch topics from repos/:user/:repo_name/topics
// this endpoint is in beta phase
const fetchTopics = repo_name => {
  $.ajax({
    url: `https://api.github.com/repos/paulpalmieri/${repo_name}/topics`,
    type: "GET",
    headers: {
      Accept: "application/vnd.github.mercy-preview+json"
    },
    success: function(res) {
      // build string of html tags
      let tag_str = "";
      if (res.names.length > 0) {
        res.names.forEach(element => {
          tag_str += `<div class="topics">${element}</div>`;
        });

        // insert string in the right container
        $(`.topics_container[data-name="${repo_name}"]`).append(tag_str);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
};

// fetch topics from repos/:user/:repo_name/languages
const fetchLanguages = repo_name => {
  $.ajax({
    url: `https://api.github.com/repos/paulpalmieri/${repo_name}/languages`,
    type: "GET",
    success: function(res) {
      let tag_str = "";
      if (!jQuery.isEmptyObject(res)) {
        const keys = Object.keys(res);

        // get total bytes
        const total = keys.reduce(function(total, element) {
          console.log(res[element] + ":  " + element);
          return total + res[element];
        }, 0);

        // compute percentages and build html tag string
        keys.forEach(element => {
          const percentage = Number(((res[element] / total) * 100).toFixed(1));
          tag_str += `<div class="language">${element}: ${percentage}%</div>`;
        });
        $(`.language_container[data-name="${repo_name}"]`).append(tag_str);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
};

// fetch all my repos from /users/paulpalmieri/repos
const fetchGitRepos = () => {
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
          const lc_name = el.name.toLowerCase();

          // check if repo has a description
          const git_page_link = el.has_pages
            ? `<a class="direct-access" href="http://paulpalmieri.github.io/${lc_name}/">Hosted on <i class="fa fa-github"></i></a>`
            : "";

          // Build div and sub divs for a repo
          // prettier ignore
          const proj_tag = `
              <div class="project">
                <a href=${el.svn_url}>
                  ${lc_name}
                  <i class="fa fa-github"></i>
                </a> 
                ${""}
                <p>
                  ${
                    el.description !== null
                      ? el.description
                      : "No description for this project"
                  }
                </p>
                <div class="topics_container" data-name="${el.name}">
                </div>
                <div class="language_container" data-name="${el.name}">
                </div>
              </div>
          `;

          // append div to container
          $("#github-container").append(proj_tag);

          // fetch topics (tags) and languages used
          fetchTopics(el.name);
          // fetchLanguages(el.name);
        });
    },
    error: function(err) {
      console.log(err);
    }
  });
};

$(document).ready(() => {
  fetchGitRepos();
  // color picker
  // $("input").on("change", function() {
  //   document.documentElement.style.setProperty(`--${this.name}`, this.value);
  // });
});
