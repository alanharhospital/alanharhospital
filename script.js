/**
 * مستشفى الأنهار التخصصي | Al-Anhar Specialized Hospital
 * ملف جافاسكريبت التفاعلي - script.js
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. فتح وإغلاق القائمة على الهواتف وتحديث aria-expanded ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.querySelector('.header');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpened = menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', isOpened ? 'إغلاق القائمة' : 'فتح القائمة');
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 2. ظل الرأس الملتصق عند التمرير ---
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // --- 3. تقييد حقل التاريخ لمنع اختيار تواريخ سابقة ---
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // --- 4. التحقق من حقول الحجز وإرسال البيانات للواتساب والبريد ---
    const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
    const btnSendEmail = document.getElementById('btnSendEmail');

    const validateBookingForm = () => {
        const fullname = document.getElementById('fullname')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const department = document.getElementById('department')?.value;
        const date = document.getElementById('booking-date')?.value;
        const period = document.getElementById('booking-period')?.value;

        if (!fullname) {
            alert('يرجى إدخال الاسم الكامل.');
            document.getElementById('fullname')?.focus();
            return null;
        }
        if (!phone || phone.length < 6) {
            alert('يرجى إدخال رقم هاتف صحيح للتواصل.');
            document.getElementById('phone')?.focus();
            return null;
        }
        if (!department) {
            alert('يرجى اختيار القسم الطبي المطلوب.');
            document.getElementById('department')?.focus();
            return null;
        }
        if (!date) {
            alert('يرجى اختيار تاريخ الحجز المطلوب.');
            document.getElementById('booking-date')?.focus();
            return null;
        }
        if (!period) {
            alert('يرجى تحديد الفترة (صباحية أو مسائية).');
            document.getElementById('booking-period')?.focus();
            return null;
        }

        const email = document.getElementById('email')?.value.trim() || 'غير محدد';

        return { fullname, phone, email, department, date, period };
    };

    // أ) الإرسال الفعلي عبر الواتساب إلى الرقم 967771422070
    if (btnSendWhatsApp) {
        btnSendWhatsApp.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = validateBookingForm();
            if (!formData) return;

            const whatsappNumber = '967771422070';
            const messageText = `🏥 *طلب حجز موعد جديد - مستشفى الأنهار التخصصي*
━━━━━━━━━━━━━━━━━━━━
👤 *اسم المريض:* ${formData.fullname}
📱 *رقم الهاتف:* ${formData.phone}
📧 *البريد الإلكتروني:* ${formData.email}
🩺 *القسم الطبي:* ${formData.department}
📅 *التاريخ المطلوب:* ${formData.date}
⏰ *الفترة:* ${formData.period}
━━━━━━━━━━━━━━━━━━━━
أرجو تأكيد حجز الموعد وتزويدي بالتفاصيل. شكراً لكم.`;

            const encodedMessage = encodeURIComponent(messageText);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // ب) الإرسال المباشر عبر تطبيق البريد المعتمد إلى ammaralqhwi20@gmail.com
    if (btnSendEmail) {
        btnSendEmail.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = validateBookingForm();
            if (!formData) return;

            const targetEmail = 'ammaralqhwi20@gmail.com';
            const subject = encodeURIComponent(`طلب حجز موعد: ${formData.fullname} - ${formData.department}`);
            const body = encodeURIComponent(`طلب حجز موعد جديد في مستشفى الأنهار التخصصي\n\n` +
                `الاسم الكامل: ${formData.fullname}\n` +
                `رقم الهاتف: ${formData.phone}\n` +
                `البريد الإلكتروني: ${formData.email}\n` +
                `القسم الطبي: ${formData.department}\n` +
                `التاريخ المطلوب: ${formData.date}\n` +
                `الفترة: ${formData.period}\n\n` +
                `يرجى تأكيد الحجز والتواصل معي.`);

            const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
            window.location.href = mailtoUrl;

            alert('سيتم فتح تطبيق البريد الإلكتروني في جهازك لإرسال بيانات الحجز مباشرة إلى ammaralqhwi20@gmail.com. يرجى الضغط على "إرسال" داخل تطبيق البريد.');
        });
    }

    // --- 5. إدارة التبويبات التفاعلية لصفحة الوحدات units.html ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                });

                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                const activePanel = document.getElementById(`panel-${targetTab}`);
                if (activePanel) {
                    activePanel.classList.add('active');
                }
            });
        });
    }

});