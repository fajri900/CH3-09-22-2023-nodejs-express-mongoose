const fs = require("fs")

const Tour = require(".././models/tourModel")

const createTourModel = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body) // Membuat tour baru dengan data dari req.body
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message, // Menampilkan pesan kesalahan jika terjadi kesalahan
    })
  }
}

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

// const checkId = (req, res, next, val) => {
//   console.log(val * 1)
//   const tour = tours.find(
//     (el) => el.id === val * 1
//   )

//   if (!tour) {
//     return res.status(404).json({
//       status: "failed",
//       message: `data with ${val} this not found`,
//     })
//   }
//   next()
// }

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: `name or price are required`,
    })
  }
  next()
}

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      length: tours.length,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }
}

const createTour = (req, res) => {
  console.log(req.body.role)
  // generate id untuk data baru dari request api kita
  const newId = tours[tours.length - 1].id + 1
  const newData = Object.assign(
    { id: newId },
    req.body
  )

  tours.push(newData)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = CREATED
      res.status(201).json({
        status: "success",
        data: {
          tour: newData,
        },
      })
    }
  )
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id

    const doc = await Tour.findById(id)

    tour = req.body
    await tour.save()

    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      })
    }
  )
}

const removeTour = (req, res) => {
  // konversi string jadi number
  const id = req.params.id * 1

  // cari index dari data yg sesuai id di req.params
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  // proses mengahpus data sesuai index array nya => req.params.id
  tours.splice(tourIndex, 1)

  // proses update di file json nya
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
        data: null,
      })
    }
  )
}

const editTourModels = async (req, res) => {
  try {
    const id = req.params.id
    const updateTour =
      await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
      })
    if (!updateTour) {
      return res.status(400).json({
        status: 400,
        message: "id not found",
      })
    }
    res.status(201).json({
      status: "success",
      data: {
        tour: updateTour,
      },
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    })
  }
}

const removeTourModels = async (req, res) => {
  try {
    const id = req.params.id
    const tour = await Tour.findByIdAndDelete(id)

    if (!tour) {
      return res.status(400).json({
        status: "success",
        message: `success delete id ${id}`,
        data: null,
      })
    }
    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    })
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  editTour,
  editTourModels,
  removeTourModels,
  removeTour,
  // checkId,
  checkBody,
  createTourModel,
}
