class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `  
      <div class="col-md-4 mb-4">
          <div class="card h-100" >
            <img src="${this.image}" class="card-img-top p-4 object-fit-cover" style="width: 100%; height: 16rem" alt="${this.model}">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title">${this.model} / ${this.type}</h6>
              <h5 class="card-subtitle mb-2 fw-bold">Rp ${this.rentPerDay}/hari</h5>
              <p class="card-text flex-grow-1">${this.description}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-person me-2"></i> ${this.capacity} orang</li>
                <li class="list-group-item"><i class="bi bi-gear me-2"></i> ${this.transmission}</li>
                <li class="list-group-item"><i class="bi bi-calendar me-2"></i> Tahun ${this.year}</li>
              </ul>
              <a href="#" class="btn btn-success mt-3">Pilih Mobil</a>
            </div>
          </div>
        </div>
    `;
  }
}
