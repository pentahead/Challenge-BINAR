class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.tipeDriver = document.getElementById("tipe-driver");
    this.tanggal = document.getElementById("tanggal");
    this.waktuJemput = document.getElementById("waktu-jemput");
    this.jumlahPenumpang = document.getElementById("jumlah-penumpang");
    //toggle disable button
    this.tipeDriver.addEventListener('change', this.toggleButton);
    this.tanggal.addEventListener('change', this.toggleButton);
    this.waktuJemput.addEventListener('change', this.toggleButton);
  }

  async init() {
    await this.load();
    this.loadButton.onclick = (e) => {
      e.preventDefault();
      this.run();
    };
  }

  toggleButton = () => {
    const isTipeDriverSelected = this.tipeDriver.value !== "default";
    const isTanggalFilled = this.tanggal.value !== "";
    const isWaktuJemputFilled = this.waktuJemput.value !== "";

    this.loadButton.disabled = !(isTipeDriverSelected && isTanggalFilled && isWaktuJemputFilled);
  }

  run = () => {
    this.clear();
    const tipeDriver = this.tipeDriver.value;
    const tanggal = this.tanggal.value;
    const waktuJemput = this.waktuJemput.value;
    const jumlahPenumpang = this.jumlahPenumpang.value;
    const currentDateTime = new Date();

    //  loading
    const loadingNode = document.createElement("div");
    loadingNode.innerHTML =
      '<h3 class="text-center my-5">Mencari kendaraan...</h3>';
    this.carContainerElement.appendChild(loadingNode);

    setTimeout(() => {
      const filteredCars = Car.list.filter((car) => {
        // Filter berdasarkan tipe driver
        if (tipeDriver !== "default") {
          if (tipeDriver === "true" && !car.available) return false;
          if (tipeDriver === "false" && car.available) return false;
        }

        // Filter berdasarkan tanggal
        if (tanggal) {
          const selectedDateTime = new Date(tanggal + "T" + waktuJemput);
          if (selectedDateTime < currentDateTime) return false;
          if (new Date(car.availableAt) > selectedDateTime) return false;
        }

        // Filter berdasarkan jumlah penumpang
        if (jumlahPenumpang && car.capacity < parseInt(jumlahPenumpang))
          return false;

        return true;
      },2000);

      this.clear();

      if (filteredCars.length > 0) {
        filteredCars.forEach((car) => {
          this.carContainerElement.innerHTML += car.render();
        });
      } else {
        const noResultNode = document.createElement("div");
        noResultNode.innerHTML =
          '<h3 class="text-center my-5">Kendaraan tidak tersedia</h3>';
        this.carContainerElement.appendChild(noResultNode);
      }
    }, 1000);
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
