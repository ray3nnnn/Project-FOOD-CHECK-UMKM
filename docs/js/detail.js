// ==================================================
// DETAIL.JS FINAL CLEAN
// FOOD CHECK UMKM
// MODAL DETAIL PEMERIKSAAN
// ==================================================



// ================================
// LIHAT DETAIL
// ================================


function lihatDetail(index){


    if(!window.dataRiwayat){

        showToast(
            "Data pemeriksaan tidak tersedia",
            "error"
        );

        return;

    }



    const item =
    window.dataRiwayat[index];



    if(!item){

        showToast(
            "Detail data tidak ditemukan",
            "error"
        );

        return;

    }




    const modal =
    document.getElementById(
        "detailModal"
    );



    const isi =
    document.getElementById(
        "detailIsi"
    );



    if(!modal || !isi){

        return;

    }




    const statusClass =

    item.hasil === "LAYAK"

    ?

    "layak"

    :

    "tidak";





    const statusIcon =

    item.hasil === "LAYAK"

    ?

    "🟢"

    :

    "🔴";






    isi.innerHTML = `


    <div class="detail-row">

        <span>
        🍜 Nama Makanan
        </span>

        <b>
        ${item.nama_makanan || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        👤 Pemilik
        </span>

        <b>
        ${item.nama || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        📂 Kategori
        </span>

        <b>
        ${item.kategori || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        📦 Kemasan
        </span>

        <b>
        ${item.kemasan || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        🎨 Warna
        </span>

        <b>
        ${item.warna || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        👃 Aroma
        </span>

        <b>
        ${item.aroma || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        ✋ Tekstur
        </span>

        <b>
        ${item.tekstur || "-"}
        </b>

    </div>




    <div class="detail-row">

        <span>
        📅 Produksi
        </span>

        <b>
        ${formatTanggal(item.tanggal_produksi)}
        </b>

    </div>




    <div class="detail-row">

        <span>
        📅 Kadaluarsa
        </span>

        <b>
        ${formatTanggal(item.tanggal_kadaluarsa)}
        </b>

    </div>




    <div class="detail-row">

        <span>
        🛡 Hasil
        </span>


        <b class="status ${statusClass}">

        ${statusIcon}
        ${item.hasil || "-"}

        </b>

    </div>




    <div class="detail-row">

        <span>
        📝 Catatan
        </span>

        <b>
        ${item.catatan || "-"}
        </b>

    </div>




    `;



    modal.style.display =
    "flex";



}







// ================================
// TUTUP MODAL
// ================================


function tutupDetail(){


    const modal =
    document.getElementById(
        "detailModal"
    );



    if(modal){

        modal.style.display =
        "none";

    }


}







// ================================
// KLIK AREA LUAR MODAL
// ================================


window.addEventListener(
"click",
function(e){


    const modal =
    document.getElementById(
        "detailModal"
    );


    if(
        modal &&
        e.target === modal
    ){

        tutupDetail();

    }


});







// ================================
// FORMAT TANGGAL CADANGAN
// ================================


function formatTanggalDetail(tanggal){


    if(!tanggal){

        return "-";

    }



    return new Date(tanggal)
    .toLocaleDateString(
        "id-ID",
        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }
    );


}