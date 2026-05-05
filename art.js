fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
.then(response => response.json())
.then(data => console.log(data));

    ids.forEach(id => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        .then(res => res.json())
        .then(obj => {
          console.log(obj);

          const div = document.createElement('div');
          div.innerHTML = `
            <h2>${obj.title}</h2>
            <img src="${obj.primaryImageSmall}" width="200"/>
          `;
          document.body.appendChild(div);
        });
    });