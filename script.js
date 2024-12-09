let totalWaste = 0; // Toplam atık kg
let students = {}; // Öğrenci verileri
let schools = {}; // Okul verileri

// Atık türleri için puanlama
const pointsSorted = {
    plastik: 2,
    cam: 3,
    pil: 6,
    elektronik: 5,
    metal: 4,
    kagit: 2,
    yag: 5,
    tekstil: 2
};

const pointsUnsorted = {
    plastik: 1,
    cam: 1,
    pil: 2,
    elektronik: 2,
    metal: 1,
    kagit: 1,
    yag: 2,
    tekstil: 1
};

// Okul kaydını kontrol etme
function registerSchool() {
    const schoolName = document.getElementById('schoolName').value;
    const schoolProvince = document.getElementById('schoolProvince').value;
    const schoolDistrict = document.getElementById('schoolDistrict').value;
    const schoolPassword = document.getElementById('schoolPassword').value;

    if (schoolName && schoolProvince && schoolDistrict && schoolPassword) {
        schools[schoolName] = {
            province: schoolProvince,
            district: schoolDistrict,
            password: schoolPassword
        };
        alert('Okul kaydı başarılı!');
    } else {
        alert('Lütfen tüm okul bilgilerini doldurun.');
    }
}

// Öğrenci kaydı
function registerStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentClass = document.getElementById('studentClass').value;

    if (studentName && studentSurname && studentNumber && studentEmail && studentClass) {
        students[studentNumber] = {
            name: studentName,
            surname: studentSurname,
            email: studentEmail,
            class: studentClass,
            totalPoints: 0,
            wasteEntries: []
        };
        alert('Öğrenci kaydı başarılı!');
    } else {
        alert('Lütfen tüm öğrenci bilgilerini doldurun.');
    }
}

// Atık girişini kaydetme
function submitWasteEntry() {
    const studentNumber = document.getElementById('studentNumber').value;
    const wasteType = document.getElementById('wasteType').value;
    const wasteWeight = parseFloat(document.getElementById('wasteWeight').value);
    const sortingStatus = document.getElementById('sortingStatus').value;

    if (students[studentNumber]) {
        let points = 0;
        if (sortingStatus === 'sorted') {
            points = wasteWeight * (pointsSorted[wasteType] || 0);
        } else {
            points = wasteWeight * (pointsUnsorted[wasteType] || 0);
        }

        students[studentNumber].totalPoints += points;
        students[studentNumber].wasteEntries.push({ wasteType, wasteWeight, points, sortingStatus });

        totalWaste += wasteWeight;
        document.getElementById('totalWasteCounter').innerText = `${totalWaste} kg`;

        alert(`Atık girişiniz başarıyla kaydedildi. Kazanılan puan: ${points}`);
    } else {
        alert('Öğrenci bulunamadı!');
    }
}

// Öğrenci verisini görüntüleme
function viewStudentData() {
    const studentNumber = document.getElementById('studentNumberView').value;
    const studentEmail = document.getElementById('studentEmailView').value;

    if (students[studentNumber]) {
        const student = students[studentNumber];
      let studentInfo = `
            <h3>Öğrenci Bilgileri</h3>
            <p><strong>Ad:</strong> ${student.name}</p>
            <p><strong>Soyad:</strong> ${student.surname}</p>
            <p><strong>Sınıf:</strong> ${student.class}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Toplam Puan:</strong> ${student.totalPoints}</p>
            <h4>Atık Girişleri:</h4>
            <ul>
        `;
        
        student.wasteEntries.forEach(entry => {
            studentInfo += `
                <li>
                    Atık Türü: ${entry.wasteType} - 
                    Miktar: ${entry.wasteWeight} kg - 
                    Puan: ${entry.points} - 
                    Durum: ${entry.sortingStatus}
                </li>
            `;
        });

        studentInfo += '</ul>';
        document.getElementById('studentData').innerHTML = studentInfo;
    } else {
        alert('Öğrenci bulunamadı!');
    }
}
