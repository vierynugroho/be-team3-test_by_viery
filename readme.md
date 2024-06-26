# [VIERY TEST] THR Lebaran Mini Challenge 4 Team-03

## Database Structure

<p align="center" width="100%">
    <img width="90%" src="./public/images/ERD/ERD.jpg"> 
</p>

<hr>

# API Documentation

<p align='center'>
<a href="https://documenter.getpostman.com/view/22814931/2sA35LUyo4" target="_blank" title="Postman Documentation"/>
<img style='width: 20%' src='https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' alt='Postman Docs' title='Postman Docs'>
</p>

[READ HERE](#)

<hr>

# EndPoint

### API

#### - Users

| METHOD | End Point         | Deskripsi                            | params | keterangan |
| ------ | ----------------- | ------------------------------------ | ------ | ---------- |
| GET    | /api/v1/users     | mendapatkan semua data users         | [-]    |            |
| GET    | /api/v1/users/:id | mendapatkan data user berdasarkan ID |        |            |
|        |                   |                                      |        |            |

#### - Auth

| METHOD | End Point           | Deskripsi              | params | catatan     |
| ------ | ------------------- | ---------------------- | ------ | ----------- |
| GET    | /api/v1/me          | mendapatkan data login | [-]    | harus login |
| POST   | /api/v1/login       | melakukan login        |        |             |
| POST   | /api/v1/register    | melakukan register     |        | harus login |
| PUT    | /api/v1/profile/:id | edit data user login   |        | harus login |
| DEL    | /api/v1/profile/:id | hapus data user        |        | harus login |
|        |                     |                        |        |

### Web Page

| End Point | Deskripsi | link             |
| --------- | --------- | ---------------- |
| /         | -         | http://localhost |

<hr>

# Data Team 3

|                      |                           |
| -------------------- | ------------------------- |
| **Anggota Tim 03**   | _Reinanda Faris_          |
|                      | _Rizaldi Mustakim_        |
|                      | _Viery Nugroho_           |
|                      | _Asyifa Maharani Gustina_ |
|                      | _Qonita Afifah_           |
|                      |                           |
| **Kelas**            | _FSW 1_                   |
|                      |                           |
| **ID Fasil**         | _F-FSW24001086_           |
| **Nama Fasilitator** | _Imam Taufiq Hermawan_    |
|                      |                           |

<hr>

# Fullstack Web Development

### KM x Binar Academy Batch 6

|                                   |
| --------------------------------- |
| **Catatan**                       |
| Mini Challenge - Stock Management |

<hr>

# Langkah Install

-   npm install
-   migration
-   seeding
-   testing

<hr>

# TABEL DETAIL

### STOCKS

-   berisikan data stok item tiap perusahaan

### ITEMS

-   berisikan data item dan jumlah stok item tersedia

### NOTES

-   tabel stocks.stock diambil dari items.stock
-   jika items.stock = 0, maka stocks.stock tidak dapat menambah stock
-   perubahan data stok item pada stocks.stock tidak berpengaruh pada items.stock
-   perubahan data items.stock terjadi jika terjadi penambahan atau pengurangan jumlah items.stock


# Rincian
- superadmin = BOS Besar (pemilik semua produk dan stok) - {tidak mempunyai companyId}
- admin = pemilik company (yang mempunyai produk dan stok dari BOS Besar)
- member = anggota company (pemilik usaha yang menjual produk dan stok)


## 💀 DANGER 
### semua role harus login untuk akses web kecuali halaman login

## register
- superadmin: register [superuser,admin]
- admin: register [member]

## peran tiap role
superadmin
- mengelola semua produk dan stok produk untuk semua perusahaan
- mengelola kategori produk
- mengelola daftar user dan admin

admin
- mengelola stok produk tiap perusahaan (menambah dan mengurangi produk dan stok produk)

member
- mengambil stok produk berdasarkan induk perusahaan (menambah atau mengurangi) - (sebagai sebuah mitra kerja atau bisnis cabang dari admin)

## halaman Web
[superadmin]
-     berisikan tampilan card company
-     CRUD company
-     berisikan tampilan tabel list produk berserta stock (with pagination)
-     CRUD produk dan stock yang terdapat dalam tabel list produk
-     berisikan tampilan tabel list users
-     CRUD users pada action tabel list users

[admin]
-     berisikan tampilan list produk dan stock (with pagination) tiap company
-     CRUD produk dan stock yang terdapat dalam list produk

[member]
-     berisikan tampilan list produk dan stock per company member
-     RU produk dan stock (tambah dan kurangi stock produk (mengambil produk))
