class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.tipeDriver = document.getElementById("tipe-driver");
    this.tanggal = document.getElementById("tanggal");
    this.waktuJemput = document.getElementById("waktu-jemput");
    this.jumlahPenumpang = document.getElementById("jumlah-penumpang");
  }

  async init() {
    await this.load();
    // Mengubah ini agar run() dipanggil saat tombol diklik
    this.loadButton.onclick = (e) => {
      e.preventDefault();
      this.run();
    };
  }

  run = () => {
    this.clear();
    const tipeDriver = this.tipeDriver.value;
    const tanggal = this.tanggal.value;
    const waktuJemput = this.waktuJemput.value;
    const jumlahPenumpang = this.jumlahPenumpang.value;

    // Mendapatkan tanggal dan waktu saat ini
    const currentDateTime = new Date();

    const filteredCars = Car.list.filter((car) => {
      // Filter berdasarkan tipe driver
      if (tipeDriver !== "default") {
        if (tipeDriver === "true" && !car.available) return false;
        if (tipeDriver === "false" && car.available) return false;
      }

      // Filter berdasarkan tanggal
      if (tanggal) {
        const selectedDateTime = new Date(tanggal + 'T' + waktuJemput);
        // Jika tanggal yang dipilih sudah lewat, return false
        if (selectedDateTime < currentDateTime) return false;
        // Jika tanggal mobil tersedia setelah tanggal yang dipilih, return false
        if (new Date(car.availableAt) > selectedDateTime) return false;
      }

      // Filter berdasarkan jumlah penumpang
      if (jumlahPenumpang && car.capacity < parseInt(jumlahPenumpang))
        return false;

      return true;
    });

    if (filteredCars.length > 0) {
      filteredCars.forEach((car) => {
        this.carContainerElement.innerHTML += car.render();
      });
    } else {
      const noResultNode = document.createElement('div');
      noResultNode.innerHTML = '<h3 class="text-center my-5">Kendaraan tidak tersedia</h3>';
      this.carContainerElement.appendChild(noResultNode);
    }
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
