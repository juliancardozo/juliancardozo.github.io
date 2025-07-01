---
layout: default
title: Mis repositorios GitHub
---

<h1>Repositorios de GitHub de Julian Cardozo</h1>
<div id="repos-by-lang"></div>

<script>
  const username = 'juliancardozo';
  const container = document.getElementById('repos-by-lang');

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      const groups = {};

      repos.forEach(repo => {
        const lang = repo.language || 'Otros';
        if (!groups[lang]) {
          groups[lang] = [];
        }
        groups[lang].push(repo);
      });

      Object.keys(groups).sort().forEach(lang => {
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.textContent = lang;
        section.appendChild(h2);

        const ul = document.createElement('ul');
        groups[lang].forEach(repo => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'Sin descripción'}`;
          ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);
      });
    })
    .catch(err => {
      container.innerHTML = '<p>Error cargando repositorios.</p>';
      console.error(err);
    });
</script>
