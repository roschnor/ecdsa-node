//
// Elliptic Curve Equation
//
// y^2 = x^3 + A*x + B (mod P)
//

const BigInt = require("big-integer");
const Point = require("./point").Point;
const modulo = require("./utils/integer").modulo;


class CurveFp {
    constructor(A, B, P, N, Gx, Gy, name, oid, nistName=null) {
        this.A = A;
        this.B = B;
        this.P = P;
        this.N = N;
        this.G = new Point(Gx, Gy);
        this.name = name;
        this.nistName = nistName;
        this._oid = oid;
    };

    contains(p) {
        if (p.x < 0 || p.x > this.P.minus(1)) {
            return false;
        }
        if (p.y < 0 || p.y > this.P.minus(1)) {
            return false;
        }
        if (!modulo(((p.y.pow(2)).minus((p.x.pow(3)).add(this.A.multiply(p.x)).add(this.B))), this.P).equals(0)) {
            return false;
        }
        return true;
    };

    length() {
        return Math.floor((1 + this.N.toString(16).length) / 2);
    };

    get oid() {
        return this._oid.slice();
    }
};


let secp256k1 = new CurveFp(
    BigInt("0000000000000000000000000000000000000000000000000000000000000000", 16),
    BigInt("0000000000000000000000000000000000000000000000000000000000000007", 16),
    BigInt("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f", 16),
    BigInt("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16),
    BigInt("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", 16),
    BigInt("483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", 16),
    "secp256k1",
    [1, 3, 132, 0, 10]
);

let prime256v1 = new CurveFp(
    BigInt("ffffffff00000001000000000000000000000000fffffffffffffffffffffffc", 16),
    BigInt("5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b", 16),
    BigInt("ffffffff00000001000000000000000000000000ffffffffffffffffffffffff", 16),
    BigInt("ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551", 16),
    BigInt("6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296", 16),
    BigInt("4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5", 16),
    "prime256v1",
    [1, 2, 840, 10045, 3, 1, 7],
    "P-256"
);

// A,B,P,Q,X,Y
let brainpoolP224r1 = new CurveFp(
    BigInt("68A5E62CA9CE6C1C299803A6C1530B514E182AD8B0042A59CAD29F43", 16),
    BigInt("2580F63CCFE44138870713B1A92369E33E2135D266DBB372386C400B", 16),
    BigInt("7C134AA264366862A18302575D0FB98D116BC4B6DDEBCA3A5A7939F", 16),
    BigInt("7C134AA264366862A18302575D1D787B09F075797DA89F57EC8C0FF", 16),
    BigInt("029AD2C7E5CF4340823B2A87DC68C9E4CE3174C1E6EFDEE12C07D", 16),
    BigInt("AA56F772C0726F24C6B89E4ECDAC24354B9E99CAA3F6D3761402CD", 16),
    "brainpoolP224r1",
    [1, 3, 36, 3, 3, 2, 8, 1, 1, 5]
);

// A,B,P,Q,X,Y
let brainpoolP256r1 = new CurveFp(
    BigInt("7D5A0975FC2C3057EEF67530417AFFE7FB8055C126DC5C6CE94A4B44F330B5D9", 16),
    BigInt("26DC5C6CE94A4B44F330B5D9BBD77CBF958416295CF7E1CE6BCCDC18FF8C07B6", 16),
    BigInt("A9FB57DBA1EEA9BC3E660A909D838D726E3BF623D52620282013481D1F6E5377", 16),
    BigInt("A9FB57DBA1EEA9BC3E660A909D838D718C397AA3B561A6F7901E0E82974856A7", 16),
    BigInt("8BD2AEB9CB7E57CB2C4B482FFC81B7AFB9DE27E1E3BD23C23A4453BD9ACE3262", 16),
    BigInt("547EF835C3DAC4FD97F8461A14611DC9C27745132DED8E545C1D54C72F046997", 16),
    "brainpoolP256r1",
    [1, 3, 36, 3, 3, 2, 8, 1, 1, 7]
);

// A,B,P,Q,X,Y
let brainpoolP320r1 = new CurveFp(
    BigInt("3EE30B568FBAB0F883CCEBD46D3F3BB8A2A73513F5EB79DA66190EB085FFA9F492F375A97D860EB4", 16),
    BigInt("520883949DFDBC42D3AD198640688A6FE13F41349554B49ACC31DCCD884539816F5EB4AC8FB1F1A6", 16),
    BigInt("D35E472036BC4FB7E13C785ED201E065F98FCFA6F6F40DEF4F92B9EC7893EC28FCD412B1F1B32E27", 16),
    BigInt("D35E472036BC4FB7E13C785ED201E065F98FCFA5B68F12A32D482EC7EE8658E98691555B44C59311", 16),
    BigInt("43BD7E9AFB53D8B85289BCC48EE5BFE6F20137D10A087EB6E7871E2A10A599C710AF8D0D39E20611", 16),
    BigInt("14FDD05545EC1CC8AB4093247F77275E0743FFED117182EAA9C77877AAAC6AC7D35245D1692E8EE1", 16),
    "brainpoolP320r1",
    [1, 3, 36, 3, 3, 2, 8, 1, 1, 9]
);

// A,B,P,Q,X,Y
let brainpoolP384r1 = new CurveFp(
    BigInt("7BC382C63D8C150C3C72080ACE05AFA0C2BEA28E4FB22787139165EFBA91F90F8AA5814A503AD4EB04A8C7DD22CE2826", 16),
    BigInt("4A8C7DD22CE28268B39B55416F0447C2FB77DE107DCD2A62E880EA53EEB62D57CB4390295DBC9943AB78696FA504C11", 16),
    BigInt("8CB91E82A3386D280F5D6F7E50E641DF152F7109ED5456B412B1DA197FB71123ACD3A729901D1A71874700133107EC53", 16),
    BigInt("8CB91E82A3386D280F5D6F7E50E641DF152F7109ED5456B31F166E6CAC0425A7CF3AB6AF6B7FC3103B883202E9046565", 16),
    BigInt("1D1C64F068CF45FFA2A63A81B7C13F6B8847A3E77EF14FE3DB7FCAFE0CBD10E8E826E03436D646AAEF87B2E247D4AF1E", 16),
    BigInt("8ABE1D7520F9C2A45CB1EB8E95CFD55262B70B29FEEC5864E19C054FF99129280E4646217791811142820341263C5315", 16),
    "brainpoolP384r1",
    [1, 3, 36, 3, 3, 2, 8, 1, 1, 11]
);

// A,B,P,Q,X,Y
let brainpoolP512r1 = new CurveFp(
    BigInt("7830A3318B603B89E2327145AC234CC594CBDD8D3DF91610A83441CAEA9863BC2DED5D5AA8253AA10A2EF1C98B9AC8B57F1117A72BF2C7B9E7C1AC4D77FC94CA", 16),
    BigInt("3DF91610A83441CAEA9863BC2DED5D5AA8253AA10A2EF1C98B9AC8B57F1117A72BF2C7B9E7C1AC4D77FC94CADC083E67984050B75EBAE5DD2809BD638016F723", 16),
    BigInt("AADD9DB8DBE9C48B3FD4E6AE33C9FC07CB308DB3B3C9D20ED6639CCA703308717D4D9B009BC66842AECDA12AE6A380E62881FF2F2D82C68528AA6056583A48F3", 16),
    BigInt("AADD9DB8DBE9C48B3FD4E6AE33C9FC07CB308DB3B3C9D20ED6639CCA70330870553E5C414CA92619418661197FAC10471DB1D381085DDADDB58796829CA90069", 16),
    BigInt("81AEE4BDD82ED9645A21322E9C4C6A9385ED9F70B5D916C1B43B62EEF4D0098EFF3B1F78E2D0D48D50D1687B93B97D5F7C6D5047406A5E688B352209BCB9F822", 16),
    BigInt("7DDE385D566332ECC0EABFA9CF7822FDF209F70024A57B1AA000C55B881F8111B2DCDE494A5F485E5BCA4BD88A2763AED1CA2B2FA8F0540678CD1E0F3AD80892", 16),
    "brainpoolP512r1",
    [1, 3, 36, 3, 3, 2, 8, 1, 1, 13]
);

let p256 = prime256v1;

let supportedCurves = [
    secp256k1,
    prime256v1,
    brainpoolP224r1,
    brainpoolP256r1,
    brainpoolP320r1,
    brainpoolP384r1,
    brainpoolP512r1,
    
];

let curvesByOid = {};
supportedCurves.forEach((curve) => {curvesByOid[curve.oid] = curve});


exports.CurveFp = CurveFp;
exports.curvesByOid = curvesByOid;
exports.secp256k1 = secp256k1;
exports.prime256v1 = prime256v1;
exports.brainpoolP224r1 = brainpoolP224r1;
exports.brainpoolP256r1 = brainpoolP256r1;
exports.brainpoolP320r1 = brainpoolP320r1;
exports.brainpoolP384r1 = brainpoolP384r1;
exports.brainpoolP512r1 = brainpoolP512r1;
exports.p256 = p256;
exports.supportedCurves = supportedCurves;
