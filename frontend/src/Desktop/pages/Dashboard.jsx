import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import profile from "../assets/profile.png"

const isStrongPassword = (password) => {
    const lengthCriteria = password.length >= 8;
    const letterCriteria = /[a-zA-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return lengthCriteria && letterCriteria && numberCriteria && specialCharCriteria;
};

const countReusedPasswords = (data) => {
    const passwordSet = new Set();
    const reusedPasswords = new Set();
    var reusedCount = 0;

    data.forEach(item => {
        if (passwordSet.has(item.password)) {
            reusedPasswords.add(item.password);
            reusedCount++
        } else {
            passwordSet.add(item.password);
        }
    });

    return reusedCount;
};

const calculateHealthScore = (weakPasswords, reusedPasswords, totalPasswords) => {
    let score = 100;

    const weakPasswordPenalty = 2;
    const reusedPasswordPenalty = 5;

    const weakPenalty = weakPasswords * weakPasswordPenalty;
    const reusedPenalty = reusedPasswords * reusedPasswordPenalty;

    score -= weakPenalty + reusedPenalty;

    score = Math.max(0, Math.min(100, score));

    return score;
};

const Dashboard = ({ data }) => {
    const totalPasswords = data.length;
    const strongPasswords = data.filter(item => isStrongPassword(item.password)).length;
    const weakPasswords = totalPasswords - strongPasswords;
    const reusedPasswords = countReusedPasswords(data);
    const healthScore = calculateHealthScore(weakPasswords, reusedPasswords, totalPasswords);

    useEffect(() => {
        const options = {
            chart: {
                height: 350,
                type: "radialBar",
            },
            series: [healthScore],
            colors: ["#20E647"],
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#293450"
                    },
                    track: {
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            blur: 4,
                            opacity: 0.15
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            color: "#fff",
                            fontSize: "13px"
                        },
                        value: {
                            color: "#fff",
                            fontSize: "30px",
                            show: true
                        }
                    }
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    gradientToColors: ["#87D4F9"],
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: "round"
            },
            labels: ["Health Score"]
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [healthScore]);

    return (
        <div className="text-white rounded-xl mx-36 p-8 min-h-screen flex flex-col items-center bg-orange-50 dark:bg-transparent">
            <div className="flex items-center mb-8 dark:text-white text-black">
                <img src={profile} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <div className="text-lg">Welcome back,</div>
                    <div className="text-xl font-bold">Tejas Chaudhari</div>
                </div>
            </div>
            <div id="chart" className="mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center px-10 py-3 bg-purple-400 rounded-lg">
                    <div className="text-3xl font-bold">{totalPasswords}</div>
                    <div className="text-sm">Total</div>
                </div>
                <div className="flex flex-col items-center px-10 py-3 bg-green-600 text-black rounded-lg">
                    <div className="text-3xl font-bold">{strongPasswords}</div>
                    <div className="text-sm">Strong</div>
                </div>
                <div className="flex flex-col items-center px-10 py-3 bg-red-400 text-white rounded-lg">
                    <div className="text-3xl font-bold">{weakPasswords}</div>
                    <div className="text-sm">Weak</div>
                </div>
                <div className="flex flex-col items-center px-10 py-3 bg-yellow-400 text-white rounded-lg">
                    <div className="text-3xl font-bold">{reusedPasswords}</div>
                    <div className="text-sm">Reused</div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard
