function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -22.9711, lng: -43.1822 }, // centro inicial
    zoom: 2,
    scrollwheel: false,
    styles: [
      { elementType: 'geometry', stylers: [{color: '#242f3e'}] },
      { elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}] },
      { elementType: 'labels.text.fill', stylers: [{color: '#746855'}] },
      { featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}] },
      { featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}] }
    ]
  });

  const locations = [
    { lat: -22.9711, lng: -43.1822 } // Rio de Janeiro
  ];

  // Tenta pegar a localização atual do usuário
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        locations.unshift(userPos); // adiciona a localização do usuário no início do array
        map.setCenter(userPos); // centraliza o mapa na localização do usuário
        map.setZoom(6);
        addMarkers();
      },
      () => {
        console.error("Usuário negou a localização ou ocorreu erro.");
        addMarkers();
      }
    );
  } else {
    console.error("Geolocalização não suportada pelo navegador.");
    addMarkers();
  }

  // Função para adicionar marcadores
  function addMarkers() {
    locations.forEach(pos => {
      new google.maps.Marker({
        position: pos,
        map: map,
        icon: "images/loc.png"
      });
    });
  }
}
